import { Request, Response } from "express";

import db from "../database/connection";
import convertHour from "../util/convertHour";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: "Faltando filtros para a pesquisa",
      });
    }

    const timeInMinutes = convertHour(time);
    console.log(timeInMinutes);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`. `class_id` = `classes`. `id`")
          .whereRaw("`class_schedule`. `week_day` = ?? ", [Number(week_day)])
          .whereRaw("`class_schedule`. `from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`. `to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction(); //caso alguma inserção der erro ele deleta as outras

    try {
      const usersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = usersIds[0];

      const classesIds = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = classesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHour(scheduleItem.from),
          to: convertHour(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit(); //insere aqui

      return res.status(201).send();
    } catch (err) {
      await trx.rollback(); //desfaz as alterações caso dê erro

      return res.status(400).json({
        error: "Houve um erro ao adicionar uma nova aula",
      });
    }
  }
}

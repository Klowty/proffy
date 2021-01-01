import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './style.css'

function TeacherItem() {
    return(
        <article className="teacher-item">
        <header>
        <img src="https://instagram.fjdo1-2.fna.fbcdn.net/v/t51.2885-15/e35/65852390_481627665740637_6964858719144104171_n.jpg?_nc_ht=instagram.fjdo1-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=cJmCZhJ2ZFUAX-lzgbj&tp=1&oh=2c4c9f9d703441eb222507e86fa73537&oe=60118A21" alt=""/>
    <div>
        <strong>Rômulo Lima</strong>
        <span>Web Development</span>
    </div>
    </header>
    <p>
        Explorador apaixonado por autocrescimento
        <br/><br/>
        Desenvolvedor web há 5 anos, graduado em Ciência da Computação pela Universidade Estadual do Ceará. Ensino e tutoria sobre as principais linguagens do mercado (NodeJS, ReactJS, ReactNative, Ruby) junto com Frameworks (Meteor, Adonis, Rails)
    </p>

    <footer>
        <p>Preço/hora
        <strong>R$ 60,00</strong>
        </p>
        <button type="button">
            <img src={whatsappIcon} alt="WhatsApp"/>
            Entrar em contato
        </button>
    </footer>
    </article>
    );
}

export default TeacherItem;
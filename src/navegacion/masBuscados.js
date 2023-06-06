import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import Slider from "react-slick";
import CardComponent from "./tarjetas";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/proxEventos.css";


const settings = {
  centerMode: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Carousel = () => {
  const [data, setApiData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://ticketback.herokuapp.com/eventos/listar`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  };

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY'); // Formatear la fecha usando moment.js
  };


  return (
    <div className="proximos-eventos">
    <h1 className="text-start titulo-eventos text-center text-light pt-5">
      Todos los Eventos
    </h1>
    <div className="eventos" style={{ padding: 40 }}>
      <Slider {...settings}>
        {data.map((event, index) => (
          <div key={index}>
            <CardComponent
              image={event.imagen}
              category={formatDate(event.fecha)}
              title={event.nombre}
              content={event.inmueble_nombre}
              eventId = {event.idEventos}
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
  );
}  

export default Carousel;

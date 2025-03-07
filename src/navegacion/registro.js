//import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import UsuarioServicio from "../servicios/UsuarioServicios";
import { encryptStorage } from "../utils/Storage";
import Footer from "./footer";
import Layout from "./Layout";
import "./css/registro.css";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import swal from "sweetalert";

const Registro = () => {
  let navigate = useNavigate();
  const [nombre, setNombre] = useState();
  const [apePat, setApepat] = useState();
  const [apeMat, setApemat] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();
  const [fecha, setFecha] = useState();

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let register = async (e) => {
    const regex =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

    e.preventDefault();
    if (!regex.test(password)) {
      swal({
        title: "Contraseña invalida",
        text: "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y un caracter especial.",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    } else {
      try {
        let res = await fetch("https://ticketbookback.herokuapp.com/usuario/crear", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            apePat: apePat,
            apeMat: apeMat,
            telefono: telefono,
            correo: correo,
            password: password,
            fechaNac: fecha,
            idRol: 2,
          }),
        });

        if (res.status === 500) {
          swal({
            title: "El correo electrónico ya está registrado",
            text: "Por favor, ingrese otro correo válido.",
            icon: "warning",
            button: "Aceptar",
          });
        } else {
          swal({
            title: "Usuario registrado con éxito!",
            text: "Hola " + nombre + ", ya puedes iniciar sesión!",
            icon: "success",
            button: "Aceptar",
          });
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Layout />

      <div className="bod">
        <div className="container2">
          <div className="title4">Registrarse</div>
          <div className="content2">
            <form method="POST" onSubmit={register}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Nombre</span>
                  <input
                    type="text"
                    required
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Apellido Paterno</span>
                  <input
                    type="text"
                    required
                    onChange={(e) => setApepat(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Apellido Materno</span>
                  <input
                    type="text"
                    required
                    onChange={(e) => setApemat(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Teléfono</span>
                  <input
                    type="text"
                    required
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="email"
                    placeholder="@ejemplo.com"
                    required
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Contraseña</span>
                  <input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Fecha de nacimiento</span>
                  <input
                    type="date"
                    required
                    max={maxDate}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-box">
                <a
                  href="/terminos"
                  target={"_blank"}
                  style={{
                    fontSize: "18px",
                    color: "#1E4CA1",
                    fontWeight: "500",
                  }}
                >
                  Términos y Condiciones
                </a>
              </div>
              <FormControlLabel
                control={<Checkbox />}
                label="Acepto los términos y condiciones."
                required
              />
              <div className="button2">
                <input className="buttons2" type="submit" value="Crear" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />  
    </>
  );
};

export default Registro;

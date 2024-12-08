import { ButtonGreen } from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import OptionsCompany from "./../assets/img/options-company-logo.png";
import { useState } from "react";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    grant_type: "password",
    email: "",
    password: ""
  });

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    try {
      const response = await axios.post("http://35.222.114.197:8000/token", {
        grant_type: values.grant_type,
        username: values.email,
        password: values.password
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      let dataResponse = response.data;

      localStorage.setItem("access_token", dataResponse.access_token);

      navigate("/cotacao-de-ativos");

      return dataResponse;
    } catch(error) {
      console.error("Erroo!!", error);
    } 
  }

    return (
      <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row justify-between align-center">
        <div className="flex flex-col align-center justify-center bg-[#37776C] h-full m-auto p-3.5 md:p-12 w-full lg:w-1/2">
          <img
            alt="Options & Company"
            src={OptionsCompany}
            className="mx-auto lg:mb-12 h-10 w-64 h-24 object-contain"
          />
        </div>

        <div className="flex flex-col align-center justify-center p-3.5 md:p-12 w-full lg:w-1/2">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6 sm:w-full sm:max-w-sm sm:m-auto">
            <div>
                <h2 className="pb-2 text-left text-2xl/9 font-bold text-gray-900">
                  Login
                </h2>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="E-mail*"
                  required
                  onChange={(event) => setValues({...values, email: event.target.value})}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Esqueci minha senha
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Senha*"
                  required
                  onChange={(event) => setValues({...values, password: event.target.value})}
                  />
              </div>
            </div>

            <div>
              <ButtonGreen type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </ButtonGreen>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Novo por aqui?{' '}
            <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Crie sua conta!
            </Link>
          </p>
        </div>
      </div>
    )
  }

export default Login;
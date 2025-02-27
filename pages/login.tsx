import Head from "next/head";
import Image from "next/image";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useAuth from "../hooks/useAuth";

type Inputs = {
  email: string,
  password: string,
};

const login = () => {
  const [login, setLogin] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const {signIn, signUp} =  useAuth()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        alt="Login Background"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true} )}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-red-500">
                Please enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true} )}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-red-500">
              Your password must contain between 4 and 60 characters
              </p>
            )}
          </label>
        </div>

        <button className="w-full rounded bg-[#e50914] py-3 font-semibold" onClick={() => setLogin(true)}>Sign In</button>

        <div>
          New to Netflix? {` `}
          <button type="submit" className="cursor-pointer hover:underline font-bold" onClick={() => setLogin(false)}>Sign up now</button>
        </div>
      </form>
    </div>
  )
}

export default login;

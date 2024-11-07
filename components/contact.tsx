import { Input, Textarea } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { type FormEvent } from "react";

import emailjs from '@emailjs/browser';

const Contact = () => {

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function submitForm(e: FormEvent) {
    e.preventDefault();

    if (formData.name === '' || formData.message === '') return;

    try {
      const response = await emailjs.send('service_peame2u', 'template_5mubyrv', { to_name: formData.email !== "" ? formData.email : "Unknown", from_name: formData.name, message: formData.message}, {publicKey: "GSWPwdXqZ-Z8rj5Xn"});

      setIsSubmitted(true);
      setFormData({ email: '', name: '', message: '' });
    }catch(e){
      console.error(e);
    }
  }

  return (
    <div className={`size-full relative dark:bg-darkBg ${isSubmitted ? "" : "lg:pr-4"} flex`}>

      {isSubmitted &&
        <div className="absolute top-[calc(50%+4px)] h-full w-full lg:w-1/2 flex items-center flex-col animate-fade text-xl font-oleo">
          <div className="-translate-y-1/2">Thank You!</div>

          <div className="relative mt-8">
            <div className="bg-black dark:bg-gray-700 w-24 h-10 absolute inset-0 rounded-lg" />
            <button type="button" onClick={() => setIsSubmitted(false)} className="bg-blue-500 dark:bg-slate-400 w-24 text-center text-white font-extralight py-2 rounded-lg focus:shadow-outline hover:!translate-x-0 h-10" style={{ transform: 'translate(-5px, -4px)', transition: 'all linear 0.15s' }}>
              More?
            </button>
          </div>

        </div>
      }

      <div className="text-2xl font-oleo h-full w-1/2 shrink-0 p-4 hidden md:block z-20" style={{ transform: isSubmitted ? "translateX(100%)" : "", transition: "all 0.5s ease-in-out" }}>
        <div className="size-full rounded-3xl flex justify-center items-center from-orange-50 to-orange-100 bg-gradient-to-bl dark:from-gray-900 dark:to-gray-950 dark:border-slate-500 dark:border shadow-md">
          <div className="from-indigo-400 to-yellow-500 bg-clip-text text-transparent bg-gradient-to-r pt-2">Signal {isSubmitted ? "Received." : "Gerald"} {!isSubmitted && ">>"}</div>
          <div className="from-indigo-400 to-yellow-500 bg-clip-text text-transparent bg-gradient-to-r pt-2 absolute blur-lg hidden dark:block">Signal {isSubmitted ? "Received." : "Gerald"} {!isSubmitted && ">>"}</div>
        </div>
      </div>

      {!isSubmitted &&
        <form onSubmit={submitForm} className="w-full flex flex-col items-center rounded-lg gap-y-2 animate-fade">

          <Input
            className="w-[90%]"
            classNames={{
              inputWrapper: "border-midnight dark:border-knight",
              label: "text-gray-400",
            }}
            name="email"
            label="Email to hear back 👋 (optional)"
            radius="lg"
            variant="underlined"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onChange={handleChange}
            value={formData.email}
          />


          <Input
            className="w-[90%]"
            classNames={{
              inputWrapper: "border-midnight dark:border-knight",
              label: "text-gray-400",
            }}
            name="name"
            label="How should I remember you? 👀"
            radius="lg"
            variant="underlined"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onChange={handleChange}
            value={formData.name}
          />

          <Textarea
            className="w-[90%]"
            classNames={{
              inputWrapper: "border-midnight dark:border-knight",
              label: "text-gray-400",
            }}
            name="message"
            label="Your signal"
            radius="lg"
            variant="underlined"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            maxRows={3}
            onChange={handleChange}
            value={formData.message}
          />

          <div className="relative m-auto translate-y-1">
            <div className="bg-black dark:bg-gray-700 w-24 h-10 absolute inset-0 rounded-lg" />
            <button type="submit" className="bg-blue-500 dark:bg-slate-400 w-24 text-center text-white font-bold py-2 rounded-lg focus:shadow-outline hover:!translate-x-0" style={{ transform: 'translate(-5px, -4px)', transition: 'all linear 0.15s' }}>
              Send <span className="lg:hidden">MSG</span>
            </button>
          </div>

        </form>
      }
    </div>
  );
};

export default Contact;

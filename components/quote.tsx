import { Button, Textarea } from "@nextui-org/react";
import { GoX } from "react-icons/go";
import Typewriter from 'typewriter-effect';
import { useState } from 'react';
import clsx from "clsx";
const Quote = () => {

  const [quote, setQuote] = useState("Creativity is intelligence having fun.");
  const [author, setAuthor] = useState("Albert Einstein");
  const [typewriterFinished, setTypewriterFinished] = useState(false);
  const [quotePrompt, setQuotePrompt] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  function editOrCancel() {
    setEditing(!editing);
  }

  function handleChange(e: any) {
    const { value } = e.target;
    setQuotePrompt(value);
  }

  async function getQuote() {

    setLoading(true);

    try {

      const response = await fetch("/api/quote", {
        method: "POST",
        body: JSON.stringify({ prompt: quotePrompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const result = JSON.parse(data.result);
      setQuote(result.quote);
      setAuthor(result.author);
      setTypewriterFinished(false);
      setEditing(false);

    } catch (e) {
      setQuote("I am confused...");
      setAuthor("Gerald Hu");
      setTypewriterFinished(false);
      setEditing(false);
      console.error(e);

    } finally {
      setLoading(false);
      setQuotePrompt("");
    }
  }
  
  return (
    <div className={clsx("flex size-full px-4 flex-col justify-around relative group dark:bg-transparent", editing && "bg-blue-300/80", !editing && "bg-slate-200")}>

      {typewriterFinished && !loading &&
        <>

          {editing && <div className="absolute top-12 right-6 font-oleo text-yellow-300 animate-fade">What&lsquo;s the topic?</div>}

          <div className="absolute top-10 left-0 animate-appearance-in">
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="100" fontFamily="Arial, sans-serif" fontSize="150" fill={`${editing ? "rgb(253,224,71)" : "blue"}`}>“</text>
            </svg>
          </div>

          <div className={clsx("absolute right-0 rotate-180 bottom-10 animate-fade transition-all", editing && " md:-translate-y-48")}>
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="100" fontFamily="Arial, sans-serif" fontSize="150" fill={`${editing ? "rgb(253,224,71)" : "blue"}`}>“</text>
            </svg>
          </div>
        </>
      }


      {!editing &&
        <>
          {!typewriterFinished ?
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(200)
                  .typeString(quote)
                  .pauseFor(350)
                  .callFunction(() => {
                    setTypewriterFinished(true);
                  })
                  .start()
              }} options={{
                delay: 60,
                cursor: '✨',
                wrapperClassName: "text-blue-300 font-oleo text-xl",
              }}
            />
            :
            <div className="text-blue-300 font-oleo">
              <span className="text-xl">{quote}</span>
              <div className="flex w-full justify-end mt-10 animate-fade text-blue-400">
                -{author}
              </div>
            </div>

          }
        </>
      }

      {editing && !loading &&
        <>
          <div className="w-full self-start mt-16">
            <Textarea
              classNames={{
                inputWrapper: "border-midnight dark:border-knight",
                label: "text-gray-400",
              }}
              // eslint-disable-next-line
              autoFocus
              name="message"
              radius="lg"
              variant="underlined"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  getQuote();
                }
              }}
              maxRows={2}
              maxLength={60}
              onChange={handleChange}
              value={quotePrompt}
            />
          </div>
          <Button
            className="w-full border-yellow-300 animate-fade"
            radius="full"
            variant="bordered"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onPress={getQuote}
          >
            Get Inspirations <span role="img" aria-label="star">✨</span>
          </Button>
        </>
      }

      {loading &&
        <div className="text-7xl animate-bounce w-full text-center">
          <span role="img" aria-label="star">✨</span>
        </div>

      }

      {typewriterFinished && !loading &&

        <button onClick={editOrCancel} onMouseDown={(e) => {
          e.stopPropagation();
        }} className={clsx("absolute bg-white dark:bg-darkBg bottom-2 left-2 transition-all w-10 h-10 md:w-[2.75rem] md:h-[2.75rem] duration-500 ease-in-out p-2 rounded-full hover:bg-default-100 border-2 border-transparent dark:border-knight animate-fade", !editing && "group-hover:w-52 w-52 md:w-[2.75rem]")}>
          <div className="flex justify-center items-center overflow-hidden">

            {!editing &&
              <span className="text-medium text-nowrap md:hidden group-hover:block md:invisible group-hover:visible mr-2 md:mr-1 animate-fade pl-4 -translate-y-[0.05rem]">
                One more with AI? <span role="img" aria-label="star">✨</span>
              </span>
            }

            <span className={clsx(!editing && "hidden md:inline group-hover:invisible")}>
              {editing ? <GoX /> : "✨"}
            </span>

          </div>
        </button>}

    </div>
  );
};

export default Quote;
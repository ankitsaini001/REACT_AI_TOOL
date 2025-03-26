import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constant";
import RecentSearch from "./RecentSearch";
import QuestionAnswer from "./QuestionAnswer";

function App() {
  const [askquestion, setQuestion] = useState("");
  const [getresult, setResult] = useState([]);
  const [getHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSelectedHistory] = useState();
  const scrollToAns = useRef();
  const [displayLoader, setLoader] = useState(false);

  const askQuery = async () => {

    if (!askquestion && !selectedHistory) {
      return false;
    }
    // store question in local storage
    if (askquestion) {
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'));
        history = [askquestion, ...history]
        localStorage.setItem('history', JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem('history', JSON.stringify([askquestion]));
        setRecentHistory([askquestion]);
      }
    }

    const payloadHistory = askquestion ? askquestion : selectedHistory;

    const payLoad = {
      contents: [
        {
          parts: [{ text: payloadHistory }],
        },
      ],
    };
    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payLoad),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    //console.log(dataString);
    setResult([...getresult, { type: 'q', text: askquestion ? askquestion : selectedHistory }, { type: 'a', text: dataString }]);
    setQuestion('');

    //scrolltoanswer
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);

    // disable loader
    setLoader(false);
  };

  //console.log(getHistory);

  //Enter Key Working

  const isEnter = (event) => {
    if (event.key == 'Enter') {
      askQuery();
    }
  }

  useEffect(() => {
    askQuery();
  }, [selectedHistory])

  return (
    <>
      <div className="grid grid-cols-5 h-screen text-white bg-gray-900">
        {/* Sidebar */}
        <RecentSearch getHistory={getHistory} setSelectedHistory={setSelectedHistory} setRecentHistory={setRecentHistory}/>

        {/* Main Content Area */}
        <div className="col-span-4 flex flex-col h-screen p-10">
          {/* Response Display Container */}
          <h3 className="text-center text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">Hello Users, Ask me Anything</h3><br />
          {
            displayLoader && displayLoader ?
              <div className="flex items-center justify-center">
                <div role="status">
                  <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              : null
          }
          <div ref={scrollToAns} className="flex-1 overflow-auto bg-zinc-800 p-4 rounded-lg shadow-lg">
            <ul>
              {
                getresult.map((item, index) => (
                  <QuestionAnswer key={index} item={item} index={index}/>
                ))
              }

            </ul>
            {/* <ul className="space-y-2">
              {getresult.length > 0 ? (
                getresult.map((item, index) => (
                  <li key={index+Math.random()} className="p-2 text-left">
                    <Answers answer={item} index={index} totalResult={getresult.length}/>
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-center">Ask me anything...</p>
              )}
            </ul> */}
          </div>

          {/* Fixed Input Field at Bottom */}
          <div className="w-full max-w-3xl mt-4 p-2 bg-zinc-800 text-white rounded-full border border-zinc-700 flex items-center shadow-md self-center">
            <input
              type="text"
              value={askquestion}
              onKeyDown={isEnter}
              onChange={(event) => setQuestion(event.target.value)}
              className="w-full p-3 bg-transparent outline-none"
              placeholder="Ask me anything..."
            />
            <button
              onClick={askQuery}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

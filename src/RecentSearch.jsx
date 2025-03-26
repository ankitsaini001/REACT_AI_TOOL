const RecentSearch = ({getHistory,setSelectedHistory,setRecentHistory}) => {
      // Delete History

  const deleteHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  }

    return (
        <>
            <div className="col-span-1 bg-zinc-800 text-center">
                <h1 className="text-md font-bold underline pt-2mt-2 flex justify-center">
                    <span>Recent Questions</span>
                    <button onClick={deleteHistory} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg></button>
                </h1>
                <ul className="text-center pt-5 mt-5 overflow-auto">
                    {
                        getHistory && getHistory.map((item, index) => (
                            <li onClick={() => setSelectedHistory(item)} className="cursor-pointer truncate hover:bg-zinc-700 hover:text-zinc-200" key={index}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default RecentSearch;
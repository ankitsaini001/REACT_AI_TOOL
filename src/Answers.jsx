import { useEffect, useState } from "react";
import { helper, replaceHeadingStars } from "./Helper";

const Answers=({answer,totalResult,index,type})=>{
    const[heading, setHeading] = useState(false);
    const[ans, setAns] = useState(answer);
    //console.log(index);
    
    useEffect(()=>{
       if (helper(answer)) {
        setHeading(true);
        setAns(replaceHeadingStars(ans));
        
       }
    },[])
    return(
        <div>
            {/* <h2>{answer}</h2> */}
            {
               index == 0 && totalResult.length > 1?<span className="pt-2 text-xl  block">{ans}</span> :  heading?<span className="pt-2 text-lg  block italic">{ans}</span>: <span className={type=='q'?'p-2':'p-5'}>{ans}</span>
            }
        </div>
    )
}

export default Answers;
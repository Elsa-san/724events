import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
  // change the sort (more recent > less recent, the sign was in the wrong way)
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
   const timer = setTimeout(() => {
      if (byDateDesc && byDateDesc.length > 0) {
        setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
      } else {
        // Handle the case where byDateDesc is undefined or empty
        // back on the first element 
        setIndex(0);
      }
    }, 5000);
return () => {
  clearTimeout(timer) // Cancel the blank
}
}
    
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div key={event.title}>
            <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((focus, radioIdx) => (
                <input
                  key={`${focus.title}`} // key modification
                  type="radio"
                  name={`radio-button ${radioIdx}`}
                  checked={index === radioIdx} // change idx for index for the radio buttons
                  onChange={() => nextCard(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

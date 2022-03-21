import React, { useState, useEffect } from "react";

import CheckBox from "./checkbox";

const StartUpProgress = () => {
  const completedInitialState = {
    foundation: false,
    discovery: false,
    delivery: false
  };
  const startUpListInitialState = {
    foundation: [
      { task: "setup my virtual office", id: 0, isSelected: false },
      { task: "set mission and vision", id: 1, isSelected: false },
      { task: "select business and name", id: 2, isSelected: false },
      { task: "buy domain name", id: 3, isSelected: false }
    ],
    discovery: [
      { task: "create road map", id: 4, isSelected: false },
      { task: "competitor analysis", id: 5, isSelected: false }
    ],
    delivery: [
      { task: "Release marketing website", id: 6, isSelected: false },
      { task: "Release MVP", id: 7, isSelected: false }
    ]
  };

  const [randomJson, setRandomJson] = useState({});
  const [completedStartUpList, setCompletedStartUpList] = useState(
    completedInitialState
  );
  const [startUpList, setStartUpList] = useState(startUpListInitialState);

  useEffect(() => {
    const completedList = window.localStorage.getItem("completedStartUpList");
    const listItem = window.localStorage.getItem("startUpList");
    if (completedList !== null && listItem !== null) {
      setCompletedStartUpList(JSON.parse(completedList));
      setStartUpList(JSON.parse(listItem));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "completedStartUpList",
      JSON.stringify(completedStartUpList)
    );
    window.localStorage.setItem("startUpList", JSON.stringify(startUpList));
  }, [completedInitialState]);

  const fetchRandomJson = () => {
    fetch("https://uselessfacts.jsph.pl/random.json")
      .then(data => data.json())
      .then(data => setRandomJson(data));
  };

  const toggleCheckbox = id => {
    for (const key in startUpList) {
      startUpList[key].forEach(list => {
        if (parseInt(id) === list.id && list.isSelected === false) {
          list.isSelected = true;
        } else {
          if (parseInt(id) === list.id && list.isSelected === true) {
            list.isSelected = false;
          }
        }
      });

      //<------TODO-----------> Clean up code using for in loop
      if (startUpList.foundation.every(item => item.isSelected === true)) {
        setCompletedStartUpList(currentState => ({
          ...currentState,
          foundation: true
        }));
      } else {
        if (startUpList.foundation.some(item => item.isSelected === false)) {
          setCompletedStartUpList(currentState => ({
            ...currentState,
            foundation: false
          }));
        }
      }

      if (startUpList.discovery.every(item => item.isSelected === true)) {
        setCompletedStartUpList(currentState => ({
          ...currentState,
          discovery: true
        }));
      } else {
        if (startUpList.discovery.some(item => item.isSelected === false)) {
          setCompletedStartUpList(currentState => ({
            ...currentState,
            discovery: false
          }));
        }
      }

      if (startUpList.delivery.every(item => item.isSelected === true)) {
        setCompletedStartUpList(currentState => ({
          ...currentState,
          delivery: true
        }));

        fetchRandomJson();
      } else {
        if (startUpList.delivery.some(item => item.isSelected === false)) {
          setCompletedStartUpList(currentState => ({
            ...currentState,
            delivery: false
          }));
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="start-up-progress">
        <h5 className="start-up-progress__title">My startup progress</h5>
        <div className="start-up-progress__level">
          <h4 className="start-up-progress__steps">Foundation</h4>
          {completedStartUpList.foundation && <span>completed</span>}
        </div>
        <div className="start-up-progress__task">
          {startUpList.foundation.map(({ task, id, isSelected }) => (
            <CheckBox
              task={task}
              key={id}
              onChange={() => toggleCheckbox(id)}
              checked={isSelected}
            />
          ))}
        </div>
        <div className="start-up-progress__level">
          <h4 className="start-up-progress__steps">Discovery</h4>
          {completedStartUpList.discovery && <span>completed</span>}
        </div>
        <div className="start-up-progress__task">
          {startUpList.discovery.map(({ task, id, isSelected }) => (
            <CheckBox
              task={task}
              key={id}
              onChange={() => toggleCheckbox(id)}
              disabled={!completedStartUpList.foundation}
              checked={isSelected}
            />
          ))}
        </div>
        <div className="start-up-progress__level">
          <h4 className="start-up-progress__steps">Delivery</h4>
          {completedStartUpList.delivery && <span>completed</span>}
        </div>
        <div className="start-up-progress__task">
          {startUpList.delivery.map(({ task, id, isSelected }) => (
            <CheckBox
              field={`checkbox.${id}`}
              task={task}
              key={id}
              onChange={() => toggleCheckbox(id)}
              disabled={!completedStartUpList.discovery}
              checked={isSelected}
            />
          ))}
        </div>
        <div>{randomJson && <p>{randomJson.text}</p>}</div>
      </div>
    </div>
  );
};

export default StartUpProgress;

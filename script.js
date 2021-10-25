import * as React from "https://cdn.skypack.dev/react@17.0.1";
import { useState, useEffect } from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const convertTime = time => {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return { minute, second };
};

const App = () => {
  const [time, setTime] = useState({ session: 25, break: 5 });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerId, setTimerId] = useState(null);
  const [activeSession, setActiveSession] = useState('session');

  // changes session when timeleft hits zero
  useEffect(() => {
    if (timeLeft === 0) {
      setActiveSession(prevActive => {
        if (prevActive === 'session') {
          return 'break';
        } else {
          return 'session';
        }
      });
    }
  }, [timeLeft]);

  useEffect(() => {
    if (activeSession === 'session') {
      setTimeLeft(time.session * 60);
    } else if (activeSession === 'break') {
      setTimeLeft(time.break * 60);
    }
  }, [time]);


  //change timer length when session changes
  useEffect(() => {
    if (activeSession === 'session') {
      setTimeLeft(time.session * 60);
    } else if (activeSession === 'break') {
      setTimeLeft(time.break * 60);
    }
  }, [activeSession]);

  //activate timer when timer is active
  useEffect(() => {
    if (isTimerActive) {
      const timer = setInterval(() => {
        setTimeLeft(oldTime => oldTime - 1);
      }, 1000);
      setTimerId(timer);
      return () => clearInterval(timer);
    } else {
      return () => clearInterval(timerId);
    }
  }, [isTimerActive]);

  // increment/decrement break time
  const adjustBreakLength = e => {
    if (e.target.id === 'break-decrement') {
      setTime(time => {
        const newTime = time.break - 1;
        if (newTime < 1) {
          return { ...time, break: 1 };
        }
        return { ...time, break: newTime };
      });
    } else if (e.target.id === 'break-increment') {
      setTime(time => {
        const newTime = time.break + 1;
        if (newTime > 60) {
          return { ...time, break: 60 };
        }
        return { ...time, break: newTime };
      });
    }
  };

  // increment/decrement session time
  const adjustSessionLength = e => {
    if (e.target.id === 'session-decrement') {
      setTime(time => {
        const newTime = time.session - 1;
        if (newTime < 1) {
          return { ...time, session: 1 };
        }
        return { ...time, session: newTime };
      });
    } else if (e.target.id === 'session-increment') {
      setTime(time => {
        const newTime = time.session + 1;
        if (newTime > 60) {
          return { ...time, session: 60 };
        }
        return { ...time, session: newTime };
      });
    }
  };

  const reset = () => {
    setIsTimerActive(false);
    setTime({ session: 25, break: 5 });
    setTimeLeft(25 * 60);
  };


  //start the timer
  const startTimer = () => {
    setIsTimerActive(oldState => oldState ? false : true);
  };

  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/
  React.createElement("div", { id: "break-label" }, /*#__PURE__*/
  React.createElement("h1", null, "Break Length"), /*#__PURE__*/
  React.createElement("h3", { id: "break-length" }, time.break), /*#__PURE__*/
  React.createElement("button", { id: "break-decrement", onClick: adjustBreakLength, disabled: isTimerActive }, "decrement"), /*#__PURE__*/
  React.createElement("button", { id: "break-increment", onClick: adjustBreakLength, disabled: isTimerActive }, "increment")), /*#__PURE__*/

  React.createElement("div", { id: "session-label" }, /*#__PURE__*/
  React.createElement("h1", null, "Session Length"), /*#__PURE__*/
  React.createElement("h3", { id: "session-length" }, time.session), /*#__PURE__*/
  React.createElement("button", { id: "session-decrement", onClick: adjustSessionLength, disabled: isTimerActive }, "decrement"), /*#__PURE__*/
  React.createElement("button", { id: "session-increment", onClick: adjustSessionLength, disabled: isTimerActive }, "increment")), /*#__PURE__*/

  React.createElement("div", { id: "timer-label" }, /*#__PURE__*/
  React.createElement("h1", null, "Session"), /*#__PURE__*/
  React.createElement("h3", { id: "time-left" },
  convertTime(timeLeft).minute < 10 ?
  `0${convertTime(timeLeft).minute}` :
  convertTime(timeLeft).minute, ":",
  convertTime(timeLeft).second < 10 ?
  `0${convertTime(timeLeft).second}` :
  convertTime(timeLeft).second), /*#__PURE__*/

  React.createElement("button", { id: "start_stop", onClick: startTimer }, "start/stop"), /*#__PURE__*/
  React.createElement("button", { id: "reset", onClick: reset }, "reset")));


};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
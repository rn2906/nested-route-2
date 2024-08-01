import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [progress, setProgress] = useState(0);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    // Cleanup function to close EventSource on component unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleStartSequence = () => {
    setEvents([]);
    setProgress(0);

    // Start listening to the server-sent events
    const eventSource = new EventSource("http://localhost:3001/start-sequence");
    eventSourceRef.current = eventSource;

    eventSource.onmessage = function (event) {
      const newEvent = JSON.parse(event.data);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      if (newEvent.progress !== undefined) {
        setProgress(newEvent.progress);
      }
    };

    eventSource.onerror = function () {
      eventSource.close();
      eventSourceRef.current = null;
    };
  };

  const handleCancelSequence = () => {
    axios
      .get("http://localhost:3001/cancel-sequence")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleNavigateToRoute5 = () => {
    axios
      .get("http://localhost:3001/route5")
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="App">
      <h1>Navigate to Routes</h1>
      <button onClick={handleStartSequence}>
        Start Sequence (Routes 1 to 8)
      </button>
      <button onClick={handleCancelSequence}>Cancel Sequence</button>
      <button onClick={handleNavigateToRoute5}>Go to Route 5</button>

      <div>
        <h2>Progress</h2>
        <progress value={progress} max="100" />
        <h2>Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {`${event.status}: ${event.route} - ${event.message}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import listPlugin from "@fullcalendar/list"

const AFSPCalendar = () => {
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    if (allEvents.length === 0 && allEvents[0] !== "no events") {
      fetch(`//aws-fetch.s3.amazonaws.com/events/merged-programs.json`)
        .then(response => {
          if (response.status >= 400) {
            throw new Error("Bad response from server")
          }
          return response.json()
        })
        .then(response => {
          setAllEvents(response.programEvents)
        })
    }
  }, [allEvents])

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={allEvents}
        buttonText={{
          dayGridMonth: "Month",
          listWeek: "List",
          today: "Today",
        }}
        headerToolbar={{
          start: "title", // will normally be on the left. if RTL, will be on the right
          center: "dayGridMonth,listWeek",
          end: "today prev,next", // will normally be on the right. if RTL, will be on the left
        }}
      />
    </div>
  )
}

export default AFSPCalendar

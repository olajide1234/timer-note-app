import React, { Fragment, useState } from 'react'
import { AddNote, Timer } from '../components'
import { Col } from 'antd';

var hours = 0;
var mins = 0;
var seconds = 0;

/**
 * Container to generate timer and pass to child components
 *
 * @component
 * @example
 * return (
 *   <WithTimer />
 * )
 */
export function WithTimer() {

  const [timerStopId, updateTimerStopId] = useState(0);
  const [timerSecs, updateTimerSecs] = useState('00');
  const [timerMins, updateTimerMins] = useState('00:');
  const [timerHrs, updateTimerHrs] = useState('00:');

  /**
   * Calls function to start timer
   *
   * @returns  {function} Function to start timer
   */
  const startFn = () => startTimer();

  /**
   * Function to stop timer
   *
   * @param   {int} id ID of current set timeout
   * @returns  {function} Function to stop timer
   */
  const stopFn = (id) => clearTimeout(id);
  
  /**
   * Function to reset timer
   *
   * @param   {int} id ID of current set timeout
   * @returns  {void}
   */
  const resetFn = (id) => {
    clearTimeout(id);
    hours = 0; mins = 0; seconds = 0;
    updateTimerSecs('00');
    updateTimerMins('00:');
    updateTimerHrs('00:');
  };

  /**
  * Function to start timer
  *
  * @returns  {void} 
  */

  const startTimer = () => {
    var stopId = setTimeout(() => {
      seconds++;

      if (seconds > 59) {
        seconds = 0; mins++;
        if (mins > 59) {
          mins = 0; hours++;
          if (hours < 10) { updateTimerHrs(`0${hours}:`); updateTimerStopId(stopId) } else { updateTimerHrs(`${hours}:`); updateTimerStopId(stopId) }
        }

        if (mins < 10) {
          updateTimerMins(`0${mins}:`); updateTimerStopId(stopId)
        }
        else {
          updateTimerMins(`${mins}:`); updateTimerStopId(stopId)
        }
      }
      if (seconds < 10) {
        updateTimerSecs(`0${seconds}`); updateTimerStopId(stopId)
      } else {
        updateTimerSecs(`${seconds}`); updateTimerStopId(stopId)
      }
      startTimer();
    }, 1000);
  }

  return (
    <Fragment>
      <Col>
        <Timer
          time={`${timerHrs}${timerMins}${timerSecs}`}
          startFn={startFn}
          stopFn={stopFn}
          resetFn={resetFn}
          currentTimerStopId={timerStopId + 1}
        />
      </Col>
      <Col><AddNote time={`${timerHrs}${timerMins}${timerSecs}`} /></Col>
    </Fragment>
  );
}

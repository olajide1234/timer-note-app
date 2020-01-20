import React, { Fragment, useState } from 'react'
import { AddNote, Timer } from '../components'
import { Col } from 'antd';

var hours = 0;
var mins = 0;
var seconds = 0;

/**
 * Function to start timer
 * Because JS does not pass-by-reference and we need to persist changes to hrs, mins and secs, we don't pass these as arguments.
 * We also simulate overloading on this function for testing
 * @param   {function} updateTimerHrs Function to update hour of timer
 * @param   {function} updateTimerMins Function to update minutes of timer
 * @param   {function} updateTimerSecs Function to update seconds of timer
 * @param   {function} updateTimerStopId Function to id of timer for stopping
 * @param   {int} h Current hour for overloading/testing
 * @param   {int} m Current minute for overloading/testing
 * @param   {int} s Current secoond for overloading/testing
 * @returns  {void} 
 */

export const startTimer = (updateTimerHrs, updateTimerMins, updateTimerSecs, updateTimerStopId, h, m, s) => {
  var stopId = setTimeout(() => {
    s ? s++ : seconds++;

    if (seconds > 59 || s > 59) {
      s ? s = 0 : seconds = 0; m ? m++ : mins++;
      if (mins > 59 || m > 59) {
        m ? m = 0 : mins = 0; h ? h++ : hours++;
        if (h) {
          if (h < 10) { updateTimerHrs(`0${hours}:`); } else { updateTimerHrs(`${hours}:`); }
        } else {
          if (hours < 10) { updateTimerHrs(`0${hours}:`); } else { updateTimerHrs(`${hours}:`); }
        }
      }

      if (m) {
        if (m < 10) {
          updateTimerMins(`0${mins}:`);
        }
        else {
          updateTimerMins(`${mins}:`);
        }
      } else {
        if (mins < 10) {
          updateTimerMins(`0${mins}:`);
        }
        else {
          updateTimerMins(`${mins}:`);
        }
      }

    }
    if (seconds < 10 || s < 10) {
      updateTimerSecs(`0${seconds}`);
    } else {
      updateTimerSecs(`${seconds}`);
    }
    updateTimerStopId(stopId)
    startTimer(updateTimerHrs, updateTimerMins, updateTimerSecs, updateTimerStopId);
  }, 1000);
}

/**
 * Resets timer
 *
 * @param   {int} id ID of current set timeout
 * @param   {function} updateTimerHrs Function to update hour of timer
 * @param   {function} updateTimerMins Function to update minutes of timer
 * @param   {function} updateTimerSecs Function to update seconds of timer
 * @returns  {void}
 */
export const resetTimer = (id, updateTimerHrs, updateTimerMins, updateTimerSecs) => {
  clearTimeout(id);
  hours = 0; mins = 0; seconds = 0;
  updateTimerSecs('00');
  updateTimerMins('00:');
  updateTimerHrs('00:');
}

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
  const [timerPause, setTimerPause] = useState(false);

  /**
   * Calls function to start timer
   *
   * @returns  {void} 
   */
  const startFn = () => { startTimer(updateTimerHrs, updateTimerMins, updateTimerSecs, updateTimerStopId); setTimerPause(false) }

  /**
   * Function to stop timer
   *
   * @param   {int} id ID of current set timeout
   * @returns  {void}
   */
  const stopFn = (id) => { clearTimeout(id); setTimerPause(true) };

  /**
   * Calls function to reset timer
   *
   * @param   {int} id ID of current set timeout
   * @returns  {void}
   */
  const resetFn = (id) => { setTimerPause(false); resetTimer(id, updateTimerHrs, updateTimerMins, updateTimerSecs); }

  return (
    <Fragment>
      <Col>
        <Timer
          time={`${timerHrs}${timerMins}${timerSecs}`}
          startFn={startFn}
          stopFn={stopFn}
          resetFn={resetFn}
          currentTimerStopId={timerStopId + 1}
          timerPause={timerPause}
        />
      </Col>
      <Col><AddNote time={`${timerHrs}${timerMins}${timerSecs}`} stopFn={stopFn} currentTimerStopId={timerStopId + 1} /></Col>
    </Fragment>
  );
}

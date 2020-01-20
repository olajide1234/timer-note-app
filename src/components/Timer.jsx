import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';

/**
 * Timer component view
 *
 * @component
 * @example
 * const time = '12:12:12'
 * const startFn = f => f
 * const resetFn = f => f
 * const stopFn = f => f
 * const currentTimerStopId = 2
 * const timerPause = true
 * return (
 *   <Timer time={time} startFn={startFn} resetFn={resetFn} stopFn={stopFn} currentTimerStopId={currentTimerStopId} timerPause={timerPause}  />
 * )
 */
export function Timer(props) {

  const { time, startFn, resetFn, stopFn, currentTimerStopId, timerPause } = props;
  const [buttonDisable, setButtonDisable] = useState({ start: false, pause: false });

  return (
    <div>
      <div className='headerText'>Control Timer</div>
      <div className='timerFace'>
        <div>{time}</div>
      </div>
      <Row type="flex" justify="space-between">
        <Col>
          <Button
            disabled={timerPause ? false : buttonDisable.start}
            onClick={() => { startFn(); setButtonDisable({ start: true, pause: false }) }}
          >
            Start
          </Button>
        </Col>
        <Col>
          <Button
            disabled={buttonDisable.pause || timerPause}
            onClick={() => { stopFn(currentTimerStopId); setButtonDisable({ start: false, pause: true }) }}
          >
            Pause
          </Button>
        </Col>
        <Col>
          <Button
            disabled={buttonDisable.reset}
            onClick={() => { resetFn(currentTimerStopId); setButtonDisable({ start: false, pause: false }) }}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
}

Timer.propTypes = {
  /**
   * Current timer value to display
   */
  time: PropTypes.string.isRequired,

  /**
   * Function to start timer
   */
  startFn: PropTypes.func.isRequired,

  /**
   * Function to reset timer
   */
  resetFn: PropTypes.func.isRequired,

  /**
   * Function to stop timer
   */
  stopFn: PropTypes.func.isRequired,

  /**
   * Id to stop timeout function
   */
  currentTimerStopId: PropTypes.number.isRequired,

  /**
   * Bool to show if timer is paused
   */
  timerPause: PropTypes.bool.isRequired
}

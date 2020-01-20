import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Form, Input, } from 'antd';
import { useDispatch } from "react-redux";
const { TextArea } = Input;

/**
 * Component for adding notes
 * 
 * @component
 * @example
 * const time = '12:12:12' 
 * const stopFn = f => f
 * currentTimerStopId = 2
 * return (
 *   <AddNote time={time} stopFn={stopFn} currentTimerStopId=2  />
 * ) 
 */
export function AddNote(props) {

  const dispatch = useDispatch();
  const { time, stopFn, currentTimerStopId } = props;
  const [note, setNote] = useState('');
  const [validate, setValidate] = useState({ status: '', help: '' });

  /**
   * Handles submission of the note
   * 
   * @param   {object} event Payload from the form
   * @returns  {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!note) {
      setValidate({ status: 'error', help: 'Note can not be empty' });
      return;
    }
    stopFn(currentTimerStopId);
    dispatch({ type: 'ADD_NOTE', payload: { time, text: note } });
    setNote('');
  }

  return (
    <div>
      <div className='headerText'>Add Notes</div>
      <div className='smallTopMargin'>
        <Form onSubmit={handleSubmit}>
          <Form.Item
            validateStatus={validate.status}
            help={validate.help}
          >
            <TextArea
              placeholder='Jot your note here'
              rows='5'
              cols='33'
              value={note}
              allowClear
              onChange={(e) => {
                if (validate.status === 'error') {
                  setValidate({ status: '', help: '' })
                }
                setNote(e.target.value)
              }}
            />
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Save note
          </Button>
        </Form>
      </div>
    </div>
  );
}

AddNote.propTypes = {
  /**
   * Current timer value for note
   */
  time: PropTypes.string.isRequired,

  /**
   * Function to stop timer
   */
  stopFn: PropTypes.func.isRequired,

  /**
   * Id of current timer to be stopped
   */
  currentTimerStopId: PropTypes.number.isRequired
}


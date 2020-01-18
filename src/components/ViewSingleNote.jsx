import React from 'react'
import PropTypes from 'prop-types';
import { Card, Button, Modal } from 'antd';
const { confirm } = Modal;

/**
 * Single note view
 *
 * @component
 * @example
 * const id = 2
 * const time = '12:12:12'
 * const text = 'Sample text'
 * const deleteFn = f => f
 * return (
 *   <ViewSingleNote id={id} time={time} text={text} deleteFn={deleteFn} />
 * )
 */
export function ViewSingleNote(props) {

  const { id, time, text, deleteFn } = props;

  /**
   * Handles showing modal for confirmation
   *
   * @param   {string} note Content of note to be deleted
   * @param   {int} id Id of note to be deleted
   * @param   {function} deleteFn Function to call for delete
   * @returns  {void}
   */
  const showConfirm = (note, id, deleteFn) => {
    confirm({
      title: 'Are you sure you wish to permanently delete the following note ?',
      content: note,
      onOk() {
        deleteFn(id)
      },
      onCancel() { },
    });
  }

  return (
    <div className='smallerTopMargin'>
      <Card
        size="small"
        title={time}
        extra={
          <Button
            type="danger"
            size="small"
            onClick={() => showConfirm(text, id, deleteFn)}
          >
            Delete
          </Button>
        }
        style={{ width: 250 }}
      >
        <p>{text}</p>
      </Card>
    </div>
  );
}

ViewSingleNote.propTypes = {
  /**
   * Id of note to be deleted
   */
  id: PropTypes.number.isRequired,

  /**
   * Note timestamp
   */
  time: PropTypes.string.isRequired,

  /**
   * Note text content
   */
  text: PropTypes.string.isRequired,

  /**
   * Function to call for note delete
   */
  deleteFn: PropTypes.func.isRequired,
}

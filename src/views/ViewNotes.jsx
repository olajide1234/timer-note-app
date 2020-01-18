import React from 'react'
import { ViewSingleNote } from '../components'
import { useSelector, useDispatch } from "react-redux";

/**
 * Container to fetch and display all notes
 *
 * @component
 * @example
 * return (
 *   <ViewNotes />
 * )
 */
export function ViewNotes() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state);

  /**
   * Function to delete a note 
   *
   * @param   {int} id Id of note to be deleted
   * @returns  {void}
   */
  const deleteFn = (id) => dispatch({ type: 'DELETE_NOTE', deleteId: id })

  return (
    <div>
      <div className='headerText'>View and Delete Notes</div>
      <div className='noteContainer'>
        {notes.length < 1 ? 'Add notes to see them appear here' : [...notes].reverse().map((note, i) => <ViewSingleNote key={i} id={note.id} time={note.time} text={note.text} deleteFn={deleteFn} />)}
      </div>
    </div>
  );
}

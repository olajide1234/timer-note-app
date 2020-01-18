export default (state = [{ id: 1, time: '12:12:12', text: 'Here is a sample note. Add more notes to see your note above this.' }], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, { ...action.payload, id: state.length + 1 }];
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.deleteId);
    default: return state;
  }
};

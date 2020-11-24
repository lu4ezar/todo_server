import TodosAPI from './todos.ts';
import ChecklistsAPI from './checklists.ts';

export default () => ({
  todosAPI: new TodosAPI(TodoModel.collection),
  checklistsAPI: new ChecklistsAPI(ChecklistModel.collection),
});

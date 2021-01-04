import TodosAPI from './todos';
import ChecklistsAPI from './checklists';
import UsersAPI from './users';
import TodoModel from '../../mongoose/models/todo.model';
import ChecklistModel from '../../mongoose/models/checklist.model';
import UserModel from '../../mongoose//models/user.model';

export { TodosAPI, ChecklistsAPI, UsersAPI };
export default () => ({
  todosAPI: new TodosAPI(TodoModel.collection),
  checklistsAPI: new ChecklistsAPI(ChecklistModel.collection),
  usersAPI: new UsersAPI(UserModel.collection),
});

export type FilterTypes = 'all' | 'active' | 'completed';

export interface TodoItem {
  label: string;
  completed: boolean;
}

export interface Store {
  items: TodoItem[],
  todos: {
    [id: string]: TodoItem;
  };
  filter: FilterTypes;
}

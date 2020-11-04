import * as React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import {MyTodoApp} from "./MyTodoApp";

export const TodoApp = () => {
  return (
    <Stack>
    {/*<Stack horizontalAlign="center">*/}
      <Stack gap={25}>
      {/*<Stack style={{ width: 400 }} gap={25}>*/}
        <TodoHeader />
        <TodoList />
        <TodoFooter />
      </Stack>
    </Stack>
  );
};

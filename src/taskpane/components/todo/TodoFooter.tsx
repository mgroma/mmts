import * as React from 'react';
import {DefaultButton, Panel, Stack, Text} from 'office-ui-fabric-react';
import { actions } from './actions';
import { connect } from 'react-redux';
import { Store } from './store';
import { useBoolean } from '@uifabric/react-hooks';

interface TodoFooterProps {
  todos: Store['todos'];
  clear: () => void;
}

const TodoFooter = (props: TodoFooterProps) => {
  const { todos, clear } = props;

  const itemCount = Object.keys(todos).filter(id => !todos[id].completed).length;
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <Text>
        {itemCount} item{itemCount === 1 ? '' : 's'} left
      </Text>
      <DefaultButton onClick={() => clear()}>Clear Completed</DefaultButton>
        <DefaultButton text="Open panel" onClick={openPanel} />
        <Panel
            headerText="Sample panel"
            isOpen={isOpen}
            onDismiss={dismissPanel}
            // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
            closeButtonAriaLabel="Close"
        >
            <p>Content goes here.</p>
            and there
        </Panel>

    </Stack>
  );
};

const ConnectedTodoFooter = connect(
  (state: Store) => ({
    todos: state.todos
  }),
  dispatch => ({
    clear: () => dispatch(actions.clear())
  })
)(TodoFooter);

export { ConnectedTodoFooter as TodoFooter };

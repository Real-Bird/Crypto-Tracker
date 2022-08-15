import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { ValidBtn } from "./CreateToDo";

const TodoItem = styled.li`
  color: ${(props) => props.theme.textColor};
  font-size: 1.3rem;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    transition: color 0.2s ease-in;
    width: 100%;
    text-align: center;
  }
`;

const ToggleToDoBtn = styled(ValidBtn)<{ name: IToDo["category"] }>`
  width: 100px;
  padding: 0;
  margin: 0 3px;
  background-color: inherit;
  background-image: linear-gradient(-180deg, #ff7e31, #e62c03);
  &:hover {
    background-image: linear-gradient(-180deg, #0a7373, #b7bf99);
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as Categories };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <TodoItem>
      <span className="text">{text}</span>
      {category !== Categories.TO_DO && (
        <ToggleToDoBtn onClick={onClick} name={Categories.TO_DO}>
          To Do
        </ToggleToDoBtn>
      )}
      {category !== Categories.DOING && (
        <ToggleToDoBtn onClick={onClick} name={Categories.DOING}>
          Doing
        </ToggleToDoBtn>
      )}
      {category !== Categories.DONE && (
        <ToggleToDoBtn onClick={onClick} name={Categories.DONE}>
          Done
        </ToggleToDoBtn>
      )}
    </TodoItem>
  );
}

export default ToDo;

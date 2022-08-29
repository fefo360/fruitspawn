import { useState, useEffect } from "react";

interface Fruit {
  name: String
}

export default function UserProfile() {
  const [fruits, setFruits] = useState<Fruit[] | undefined>([]);
  const [loop, setLoop] = useState<NodeJS.Timer | undefined>(undefined);
  const [gameIsRunning, setGameIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (gameIsRunning) {
      setLoop(
        setInterval(() => {
          start();
        }, 2000)
      );
    } else {
      clearInterval(loop);
      console.log("cleared interval");
    }
  }, [gameIsRunning]);

  const addFruit = () => {
    setFruits((prev) => {
      if (!prev) return;
      if (prev.length < 3) {
        console.log(`${prev.length} less than 3`);
        return [...prev, {name: 'Apple'}];
      }
      return [...prev]
    });
  };

  const start = () => {
    console.log(`Game Started`);
    addFruit();
  };


  const deleteOne = () => {
    setFruits(prev => {
      if(!prev) return
      return prev.filter((item, idx) => {
        if (idx === 0) return false;
        return true;
      })
  });
  };


  return (
    <div>
      <p>Fruit Count: {fruits?.length}</p>
      <button onClick={deleteOne}>{(fruits?.length === 0 ) ? "No Fruits Available" : "Remove a Fruit"}</button>
      <button onClick={() => setGameIsRunning((prev) => !prev)}>
        {gameIsRunning ? "Pause" : "Start Game"}
      </button>
      {fruits?.map(fruit => {
        return <p>{fruit.name}</p>
      })}
    </div>
  );
}

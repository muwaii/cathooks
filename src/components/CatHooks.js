import { useState, useEffect } from "react";
import { fetchCat } from "../api/api";

// ======= Custom Hook =======
function useInput(initialState) {
  const [value, setValue] = useState(0);
  function handleInput(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleInput,
  }
}

function useCat(id) {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  async function fetch() {
    console.log('fetch function run!');
    setLoading(true);
    const getCat = await fetchCat(id);
    setLoading(false);
    setCat(getCat);
  }
  // useEffect do 3 method when => did mount, did update, will unmount
  useEffect(() => {
    fetch();
  }, [id]);
  return {
    cat,
    loading,
  }
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  function handleResize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    // window.addEventListener('event type', function);
    window.addEventListener('resize', handleResize); 

    // will unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []); // [] คือ ให้มัน run เฉพาะตอน did mount
  return width;
}

// ======= Component =======
function Cat() {
  const { value: id, onChange } = useInput(0);
  const { value: owner, onChange: onOwnerChange } = useInput('KKK');
  const { cat, loading } = useCat(id);
  const width = useWindowWidth();

  return (
    <div>
      <section>
        <span>ID: </span>
        <input value={id} onChange={onChange} />
      </section>
      <section>
        <span>Owner: </span>
        <input value={owner} onChange={onOwnerChange} />
      </section>
      {loading ?
      (<div>loading...</div>) : cat ?
      (<section>
        <img src={cat.avatar} />
        <h2>{cat.first_name}: windiw width {width}px!</h2>
      </section>) : <div>No cat</div>
      }
    </div>
  )
}

export default Cat;
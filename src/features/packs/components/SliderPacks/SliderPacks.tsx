import Slider from "@mui/material/Slider/Slider";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { packsThunks } from "features/packs/packs.slice";
import s from "./style.module.css";

export const SliderPacks = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const minQuery = Number(params.min);
  const maxQuery = Number(params.max);
  const minCard = useAppSelector((state) => state.packs.list.minCardsCount);
  const maxCard = useAppSelector((state) => state.packs.list.maxCardsCount);
  const [value, setValue] = useState<number[]>([0, 1]);

  useEffect(() => {
    setValue([minQuery || 0, maxQuery || maxCard || 0]);
  }, [minQuery, maxQuery, maxCard]);

  const changeHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onCommitHandler = (
    event: SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    const min = (newValue as number[])[0];
    const max = (newValue as number[])[1];
    setSearchParams({ ...params, min: min.toString(), max: max.toString() });
    dispatch(packsThunks.get({ ...params, min, max }));
  };

  return (
    <div>
      <div className={s.title}>Number of cards</div>
      <div className={s.box}>
        <div className={s.value}>{minQuery || minCard}</div>
        <div className={s.slider}>
          <Slider
            value={value}
            min={minCard}
            max={maxCard}
            onChange={changeHandler}
            onChangeCommitted={onCommitHandler}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={s.value}>{maxQuery || maxCard}</div>
      </div>
    </div>
  );
};

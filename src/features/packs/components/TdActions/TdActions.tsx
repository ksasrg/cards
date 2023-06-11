import teacher from "assets/teacher.svg";
import { AppLink } from "common/components";
import { RouterPaths } from "common/router/router";
import { CardPack } from "features/packs/packs.slice";
import { useAppSelector } from "app/hooks";
import { PackActionEditName } from "../PackActionEditName/PackActionEditName";
import { PackActionDeletePack } from "../PackActionDeletePack/PackActionDeletePack";

type Props = {
  pack: CardPack;
};

export const TdActions = ({ pack }: Props) => {
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const isMy = userId === pack.user_id;
  const isActive = Boolean(pack.cardsCount);

  return (
    <>
      <td>
        {isActive ? (
          <AppLink to={`${RouterPaths.learn}/${pack._id}`}>
            <img src={teacher} alt="learn" />
          </AppLink>
        ) : (
          <img src={teacher} alt="learn" style={{ opacity: "0.5" }} />
        )}
        {isMy && (
          <>
            <PackActionEditName pack={pack} />
            <PackActionDeletePack pack={pack} />
          </>
        )}
      </td>
    </>
  );
};

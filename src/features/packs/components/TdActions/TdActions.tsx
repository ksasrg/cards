import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { AppLink } from "common/components";
import { RouterPaths } from "common/router/router";
import { CardPack } from "features/packs/packs.slice";
import { useAppSelector } from "app/hooks";

type Props = {
  pack: CardPack;
  onDelete: () => void;
};

export const TdActions = ({ onDelete, pack }: Props) => {
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const isMy = userId === pack.user_id;
  const isActive = Boolean(pack.cardsCount) || isMy;

  return (
    <td>
      {isActive ? (
        <AppLink to={`${RouterPaths.cards}/?cardsPack_id=${pack._id}`}>
          <img src={teacher} alt="learn" />
        </AppLink>
      ) : (
        <img src={teacher} alt="learn" style={{ opacity: "0.5" }} />
      )}

      {isMy && (
        <>
          <img src={editIconMini} alt="edit" />
          <img src={trash} alt="delete" onClick={() => onDelete()} />
        </>
      )}
    </td>
  );
};

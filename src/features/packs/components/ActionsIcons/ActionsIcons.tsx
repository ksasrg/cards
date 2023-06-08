import teacher from "assets/teacher.svg";
import editIconMini from "assets/editIconMini.svg";
import trash from "assets/trash.svg";
import { AppLink } from "common/components";
import { RouterPaths } from "common/router/router";

type Props = {
  isMy: boolean;
  isActive: boolean;
  packId: string;
  onDelete: () => void;
};

export const ActionIcons = ({ isMy, isActive, packId, onDelete }: Props) => {
  return (
    <>
      {isActive ? (
        <AppLink to={`${RouterPaths.cards}/?cardsPack_id=${packId}`}>
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
    </>
  );
};

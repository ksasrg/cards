import { AppLink } from "common/components";
import { RouterPaths } from "common/router/router";

type Props = { packId: string; name: string; isActive: boolean };

export const PackCell = ({ name, packId, isActive }: Props) => {
  return (
    <>
      {isActive ? (
        <AppLink to={`${RouterPaths.cards}/?cardsPack_id=${packId}`}>
          {name}
        </AppLink>
      ) : (
        name
      )}
    </>
  );
};

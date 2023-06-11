import { useAppSelector } from "app/hooks";
import { AppLink } from "common/components";
import { RouterPaths } from "common/router/router";
import { CardPack } from "features/packs/packs.slice";

type Props = { pack: CardPack };

export const TdPackName = ({ pack }: Props) => {
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const isMy = userId === pack.user_id;
  const isActive = Boolean(pack.cardsCount) || isMy;

  return (
    <td>
      {isActive ? (
        <>
          {pack.private && <b> P </b>}
          <AppLink to={`${RouterPaths.cards}/?cardsPack_id=${pack._id}`}>
            {pack.name}
          </AppLink>
        </>
      ) : (
        pack.name
      )}
    </td>
  );
};

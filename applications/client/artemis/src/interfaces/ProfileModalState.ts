import {IProfile} from "./IProfile";

interface ProfileModalOpen {
    state: "open";
    profile: IProfile;
}

interface ProfileModalClosed {
    state:"closed";
}

type ProfileModalState = ProfileModalOpen | ProfileModalClosed;

export type { ProfileModalState };
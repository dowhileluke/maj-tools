export type LimitHand = {
	name: string;
	han: string;
	baseValue: number;
}

export type AppState = {
	isDealer: boolean;
	isDelta: boolean;
	isLightMode: boolean;
	isMenuOpen: boolean;
	repeatCount: number;
}

export type AppActions = {
	setIsDealer: (isDealer: boolean) => void;
	setIsDelta: (isDelta: boolean) => void;
	setIsLightMode: (isLightMode: boolean) => void;
	setIsMenuOpen: (isMenuOpen: boolean) => void;
	setRepeatCount: (repeatCount: number) => void;
}

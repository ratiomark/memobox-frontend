import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TooltipContextType {
	isEnabled: boolean;
	setIsEnabled: (isEnabled: boolean) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

interface TooltipProviderProps {
	children: ReactNode;
}

export const useTooltip = (): TooltipContextType => {
	const context = useContext(TooltipContext);
	if (context === undefined) {
		throw new Error('useTooltip must be used within a TooltipProvider');
	}
	return context;
};

export const CustomTooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(true);

	useEffect(() => {
		const storedTooltipIsEnabled = localDataService.getTooltipIsEnabled()
		setIsEnabled(storedTooltipIsEnabled);
		// if (storedTooltipEnabled) {
		// 	setIsEnabled(storedTooltipEnabled === 'true');
		// }
	}, []);

	useEffect(() => {
		localDataService.setTooltipIsEnabled(isEnabled)
	}, [isEnabled]);

	return (
		<TooltipContext.Provider value={{ isEnabled, setIsEnabled }}>
			{children}
		</TooltipContext.Provider>
	);
};
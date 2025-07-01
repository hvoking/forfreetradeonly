import { GaugeSizesProvider } from './gauge';
import { BarsSizesProvider } from './bars';
import { DotsSizesProvider } from './dots';
import { RadiusSizesProvider } from './radius';
import { SliderSizesProvider } from './slider';

export const SizesProvider = ({ children }: any) => {
	return (
		<GaugeSizesProvider>
		<BarsSizesProvider>
		<DotsSizesProvider>
		<RadiusSizesProvider>
		<SliderSizesProvider>
			{children}
		</SliderSizesProvider>
		</RadiusSizesProvider>
		</DotsSizesProvider>
		</BarsSizesProvider>
		</GaugeSizesProvider>
	)
}

SizesProvider.displayName="SizesProvider";
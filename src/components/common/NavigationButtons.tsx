'use client';
import {NavigationButtonsProps} from "@/src/types/api";

export default function NavigationButtons({
                                              onBack,
                                              onNext,
                                              nextLabel = 'Pokračovať →',
                                              backLabel = '← Späť',
                                              hideBack = false,
                                              isNextDisabled = false,
                                              isLoading = false,
                                          }: NavigationButtonsProps) {
    return (
        <div className="flex justify-between items-center">
            {!hideBack ? (
                <button
                    type="button"
                    className="w-[128px] h-14 px-8 py-4 text-gray-500 hover:text-gray-700 figma-button-text rounded-lg border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    onClick={onBack}
                    disabled={!onBack}
                >
                    {backLabel}
                </button>
            ) : (
                <div />
            )}
            <button
                type="button"
                className="w-[179px] h-14 px-8 py-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition figma-button-text flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onNext}
                disabled={isNextDisabled || isLoading}
            >
                {isLoading ? 'Načítavam...' : nextLabel}
            </button>
        </div>
    );
}

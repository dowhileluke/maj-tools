import { Dispatch, SetStateAction, useState } from 'react'

type UseStateResult<T> = [T, Dispatch<SetStateAction<T>>]

export function useDraftState<S>(source: S): UseStateResult<S>
export function useDraftState<S, T = S>(source: S, mapFn: (source: S) => T): UseStateResult<T>
export function useDraftState<S, T = S>(source: S, mapFn?: (source: S) => T) {
	const [original, setOriginal] = useState(source)
	const [draft, setDraft] = useState(() => mapFn ? mapFn(source) : source)

	if (source !== original) {
		setOriginal(source)
		setDraft(mapFn ? mapFn(source) : source)
	}

	return [draft, setDraft] as const
}

import { Component, Section } from '@prisma/client'

type SortPosition = Section | Component

const sortPosition = (a: SortPosition, b: SortPosition) => a.position - b.position

export { sortPosition }
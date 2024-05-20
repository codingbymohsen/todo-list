export class FetchTodolistsQuery {
  constructor(
    public readonly payload: { page: number; limit: number; userId: string },
  ) {}
}

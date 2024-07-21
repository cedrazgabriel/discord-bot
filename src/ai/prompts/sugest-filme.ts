export interface sugestMovieParams {
    genre?: string
}

export function generateSugestMoviePrompt({ genre }: sugestMovieParams) {

    return `Me sugira um filme ${genre ? `do gênero ${genre}` : ''}
            e não me faça perguntas, só me sugira um filme.`;
}

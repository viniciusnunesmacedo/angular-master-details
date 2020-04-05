import { InMemoryDbService } from "angular-in-memory-web-api";

import { Category } from  "./pages/categories/shared/category.model";

export class InMemoryDbService implements InMemoryDbService{

    createDb(){
        const categories: Category = [
            { id: 1, name: "Moradia", description: "Pagamentos das contas de casa." },
            { id: 2, name: "Saúde", description: "Plano de saúde e remédios." },
            { id: 3, name: "Lazer", description: "Cinemas, parque, praias, etc." },
            { id: 4, name: "Salário", description: "Recebimento de salário." },
            { id: 5, name: "Trabalho", description: "Trabalhos como freelancer." }
        ]

        return { categories };
    }
}
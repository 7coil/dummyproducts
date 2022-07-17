import { useEffect, useState } from "react";
import apis from "../config.json";
import { Environment } from "../types/env";

class Category {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static getAllCategoriesEndpoint() {
    const env: Environment = process.env.NODE_ENV as Environment;
    return apis[env].categories;
  }

  static useCategories() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
      fetch(this.getAllCategoriesEndpoint())
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);

    return categories;
  }
}

export { Category };

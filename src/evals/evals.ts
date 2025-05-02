//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const holaspirit_list_tasksEval: EvalFunction = {
  name: 'holaspirit_list_tasksEval',
  description: 'Evaluates the functionality of listing tasks in HolaSpirit',
  run: async () => {
    const result = await grade(openai("gpt-4"), "List all tasks in my HolaSpirit organization");
    return JSON.parse(result);
  }
};

const holaspirit_list_metricsEval: EvalFunction = {
    name: 'holaspirit_list_metrics Evaluation',
    description: 'Evaluates the listing of metrics in the organization',
    run: async () => {
        const result = await grade(openai("gpt-4"), "List all metrics in the organization using HolaSpirit.");
        return JSON.parse(result);
    }
};

const holaspirit_list_circlesEval: EvalFunction = {
    name: "holaspirit_list_circles Evaluation",
    description: "Evaluates the holaspirit_list_circles tool",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please list all the circles in my Holaspirit organization.");
        return JSON.parse(result);
    }
};

const holaspirit_get_circle: EvalFunction = {
    name: 'holaspirit_get_circle Tool Evaluation',
    description: 'Evaluates the correctness of retrieving circle details from Holaspirit',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please provide the details of the circle with ID 1234 in Holaspirit.");
        return JSON.parse(result);
    }
};

const holaspirit_list_rolesEval: EvalFunction = {
    name: 'holaspirit_list_roles Evaluation',
    description: 'Evaluates the tool that lists all roles in the organization',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please list all the roles in the organization using the holaspirit_list_roles tool.");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [holaspirit_list_tasksEval, holaspirit_list_metricsEval, holaspirit_list_circlesEval, holaspirit_get_circle, holaspirit_list_rolesEval]
};
  
export default config;
  
export const evals = [holaspirit_list_tasksEval, holaspirit_list_metricsEval, holaspirit_list_circlesEval, holaspirit_get_circle, holaspirit_list_rolesEval];
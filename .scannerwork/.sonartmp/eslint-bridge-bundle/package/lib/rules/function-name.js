"use strict";
/*
 * SonarQube JavaScript Plugin
 * Copyright (C) 2011-2022 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// https://sonarsource.github.io/rspec/#/rspec/S100/javascript
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const utils_1 = require("../utils");
exports.rule = {
    meta: {
        messages: {
            renameFunction: "Rename this '{{function}}' function to match the regular expression '{{format}}'.",
        },
    },
    create(context) {
        const functionStack = [];
        const functionKnowledge = new Map();
        return {
            Property: (node) => {
                const prop = node;
                if (isFunctionExpression(prop.value)) {
                    checkName(prop.key);
                }
            },
            VariableDeclarator: (node) => {
                const variable = node;
                if (isFunctionExpression(variable.init)) {
                    checkName(variable.id);
                }
            },
            'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression': (node) => {
                functionStack.push(node);
                if (node.type === 'FunctionDeclaration') {
                    functionKnowledge.set(node, {
                        startsWithCapital: nameStartsWithCapital(node),
                        returnsJSX: false,
                    });
                }
            },
            'FunctionDeclaration:exit': (node) => {
                functionStack.pop();
                const knowledge = functionKnowledge.get(node);
                if (!isReactFunctionComponent(knowledge)) {
                    checkName(node.id);
                }
            },
            'FunctionExpression:exit': () => {
                functionStack.pop();
            },
            'ArrowFunctionExpression:exit': () => {
                functionStack.pop();
            },
            ReturnStatement: (node) => {
                const returnStatement = node;
                const knowledge = functionKnowledge.get((0, utils_1.last)(functionStack));
                if (knowledge &&
                    returnStatement.argument &&
                    returnStatement.argument.type === 'JSXElement') {
                    knowledge.returnsJSX = true;
                }
            },
            MethodDefinition: (node) => {
                const key = node.key;
                checkName(key);
            },
        };
        function checkName(id) {
            const [{ format }] = context.options;
            if (id && id.type === 'Identifier' && !id.name.match(format)) {
                context.report({
                    messageId: 'renameFunction',
                    data: {
                        function: id.name,
                        format,
                    },
                    node: id,
                });
            }
        }
    },
};
function isFunctionExpression(node) {
    return node && (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression');
}
function isReactFunctionComponent(knowledge) {
    return knowledge !== undefined && knowledge.startsWithCapital && knowledge.returnsJSX;
}
function nameStartsWithCapital(node) {
    return node.id !== null && node.id.name[0] === node.id.name[0].toUpperCase();
}
//# sourceMappingURL=function-name.js.map
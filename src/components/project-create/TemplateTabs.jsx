import { useState } from "react";
import { Button, Tab, Tabs, Dropdown } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  NumberDictionary,
  adjectives,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

const generateName = () => {
  const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
  const shortName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, numberDictionary],
    length: 3,
    separator: "-",
  });
  return shortName;
};

function TemplateTabs({ data, onCreate }) {
  const [currentTemplate, setCurrentTemplate] = useState(data["rust"][0]);

  const renderTemplateDropdown = (templates) => {
    return templates.map((template) => {
      return (
        <Dropdown.Item
          onClick={() => setCurrentTemplate(template)}
          active={template.name == currentTemplate.name}
          key={template.template_name}
        >
          {template.template_name}
        </Dropdown.Item>
      );
    });
  };

  const createProject = () => {
    let req = {
      name: generateName(),
      language: currentTemplate.language,
      template: currentTemplate,
    };
    onCreate(req);
  };

  const createEmptyProject = () => {
    let req = {
      name: generateName(),
      language: "rust",
    };
    onCreate(req);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey={currentTemplate.language}
        transition={false}
        className="mb-3"
      >
        <Tab eventKey="rust" title="Rust">
          <div className="border-bottom pb-3 mb-3">
            <Dropdown as={"span"}>
              <Dropdown.Toggle className="text-decoration-none" variant="link">
                {currentTemplate.template_name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {renderTemplateDropdown(data["rust"])}
              </Dropdown.Menu>
            </Dropdown>
            <span className="text-secondary ms-3">
              {currentTemplate.description}
            </span>
          </div>
          <SyntaxHighlighter
            className="p-0"
            wrapLongLines
            language="rust"
            style={githubGist}
            showLineNumbers
            lineNumberStyle={{ color: "#AAA", fontSize: "0.8rem" }}
          >
            {currentTemplate.content}
          </SyntaxHighlighter>
        </Tab>
        <Tab eventKey="javascript" title="JavaScript">
          <div className="border-bottom pb-3 mb-3">
            <Dropdown as={"span"}>
              <Dropdown.Toggle className="text-decoration-none" variant="link">
                {currentTemplate.template_name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {renderTemplateDropdown(data["javascript"])}
              </Dropdown.Menu>
            </Dropdown>
            <span className="text-secondary ms-3">
              {currentTemplate.description}
            </span>
          </div>
          <SyntaxHighlighter
            className="p-0"
            wrapLongLines
            language="rust"
            style={githubGist}
            showLineNumbers
            lineNumberStyle={{ color: "#AAA", fontSize: "0.8rem" }}
          >
            {currentTemplate.content}
          </SyntaxHighlighter>
        </Tab>
      </Tabs>
      <div className="d-flex border-top pt-3 justify-content-end">
        <Button variant="outline-secondary me-3" onClick={createEmptyProject}>
          Create empty project
        </Button>
        <Button variant="outline-primary" onClick={createProject}>
          Create project from{" "}
          {currentTemplate.template_name +
            " (" +
            currentTemplate.language +
            ")"}
        </Button>
      </div>
    </div>
  );
}

export default TemplateTabs;

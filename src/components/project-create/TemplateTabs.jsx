import { useState } from "react";
import { Button, Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
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
  const [currentTemplate, setCurrentTemplate] = useState(data["javascript"][0]);

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
      language: "javascript",
    };
    onCreate(req);
  };

  const renderTemplateListNav = (templates) => {
    return templates.map((template) => {
      return (
        <Nav.Item key={template.name}>
          <Nav.Link
            onClick={() => {
              setCurrentTemplate(template);
            }}
            eventKey={template.name}
            className="px-2"
          >
            {template.template_name}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  const renderTemplateListPane = (templates) => {
    return templates.map((template) => {
      return (
        <Tab.Pane eventKey={template.name} key={template.name}>
          <p className="text-secondary">{template.description}</p>
          <SyntaxHighlighter
            className="p-0"
            wrapLongLines
            language="rust"
            style={githubGist}
            showLineNumbers
            lineNumberStyle={{ color: "#AAA", fontSize: "0.8rem" }}
          >
            {template.content}
          </SyntaxHighlighter>
        </Tab.Pane>
      );
    });
  };

  return (
    <div>
      <Tabs
        defaultActiveKey={currentTemplate.language}
        transition={false}
        className="mb-3"
        onSelect={(key) => {
          setCurrentTemplate(data[key][0]);
        }}
      >
        <Tab eventKey="javascript" title="JavaScript">
          <Tab.Container
            className="templates-list"
            defaultActiveKey={data["javascript"][0].name}
          >
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column pb-3">
                  {renderTemplateListNav(data["javascript"])}
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  {renderTemplateListPane(data["javascript"])}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="rust" title="Rust">
          <Tab.Container
            className="templates-list"
            defaultActiveKey={data["rust"][0].name}
          >
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column pb-3">
                  {renderTemplateListNav(data["rust"])}
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  {renderTemplateListPane(data["rust"])}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
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

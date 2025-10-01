"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * Props interface for XMLFormatter component
 * @interface XMLFormatterProps
 * @property {string} xmlString - The XML string to be formatted and displayed
 * @property {string} [className] - Optional CSS class names for styling
 */
interface XMLFormatterProps {
  xmlString: string;
  className?: string;
}

/**
 * Interface representing a parsed XML node in the tree structure
 */
interface XMLNode {
  type: 'element' | 'text' | 'comment' | 'declaration';
  name?: string;
  attributes?: Record<string, string>;
  children?: XMLNode[];
  value?: string;
  isCollapsed?: boolean;
}

/**
 * Parses an XML string into a structured XMLNode tree
 * Handles malformed content and provides graceful error handling
 */
const parseXML = (xmlString: string): XMLNode | null => {
  try {
    // Clean the XML string
    const cleanXML = xmlString.trim();

    // Check if it's malformed HTML instead of XML
    if (cleanXML.toLowerCase().includes('<!doctype html') ||
        cleanXML.toLowerCase().includes('<html')) {
      return {
        type: 'element',
        name: 'error',
        children: [{
          type: 'text',
          value: 'This appears to be HTML content, not XML. The server may be returning an error page instead of XML data.'
        }]
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanXML, 'text/xml');

    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return {
        type: 'element',
        name: 'error',
        children: [{
          type: 'text',
          value: `XML Parsing Error: ${parserError.textContent || 'Invalid XML structure'}`
        }]
      };
    }

    const convertNodeToXMLNode = (node: Node): XMLNode | null => {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          const element = node as Element;
          const attributes: Record<string, string> = {};

          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            attributes[attr.name] = attr.value;
          }

          const children: XMLNode[] = [];
          for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = convertNodeToXMLNode(node.childNodes[i]);
            if (childNode) children.push(childNode);
          }

          return {
            type: 'element',
            name: element.tagName,
            attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
            children: children.length > 0 ? children : undefined,
            isCollapsed: false
          };

        case Node.TEXT_NODE:
          const text = node.textContent?.trim();
          return text ? { type: 'text', value: text } : null;

        case Node.COMMENT_NODE:
          return { type: 'comment', value: node.textContent || '' };

        default:
          return null;
      }
    };

    if (doc.documentElement) {
      return convertNodeToXMLNode(doc.documentElement);
    }

    return null;
  } catch (error) {
    return {
      type: 'element',
      name: 'error',
      children: [{
        type: 'text',
        value: `Failed to parse XML: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    };
  }
};

/**
 * Renders an individual XML node with proper indentation and collapsible functionality
 * Handles different node types (element, text, comment, error) with appropriate styling
 */
const XMLNodeComponent: React.FC<{
  node: XMLNode;
  level: number;
  onToggleCollapse?: (path: string) => void;
  path: string;
}> = ({ node, level, onToggleCollapse, path }) => {
  const indent = level * 20;

  if (node.type === 'text') {
    return (
      <div style={{ marginLeft: indent }} className="text-gray-800 py-0.5">
        {node.value}
      </div>
    );
  }

  if (node.type === 'comment') {
    return (
      <div style={{ marginLeft: indent }} className="text-gray-500 italic">
        &lt;!-- {node.value} --&gt;
      </div>
    );
  }

  if (node.type === 'element' && node.name === 'error') {
    return (
      <div className="xml-error p-4 bg-red-50 border border-red-200 rounded-md">
        <div className="font-semibold text-red-800 mb-2">XML Display Error</div>
        <div className="text-red-700 text-sm">
          {node.children?.[0]?.value}
        </div>
      </div>
    );
  }

  if (node.type === 'element') {
    const hasChildren = node.children && node.children.length > 0;
    // @ts-ignore
    const hasTextContent = hasChildren && node.children.some(child => child.type === 'text');

    return (
      <div>
        <div style={{ marginLeft: indent }} className="py-0.5 flex items-start">
          {hasChildren && (
            <button
              onClick={() => onToggleCollapse?.(path)}
              className="flex-shrink-0 p-0.5 hover:bg-gray-200 rounded mr-1"
              type="button"
            >
              {node.isCollapsed ? (
                <ChevronRight className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          )}

          <div className="flex-1">
            <span className="text-blue-600">&lt;</span>
            <span className="text-pink-600 font-semibold">{node.name}</span>

            {node.attributes && Object.entries(node.attributes).map(([key, value]) => (
              <span key={key}>
                {' '}
                <span className="text-orange-600">{key}</span>
                <span className="text-gray-600">=</span>
                <span className="text-green-600">"{value}"</span>
              </span>
            ))}

            {!hasChildren ? (
              <span className="text-blue-600">/&gt;</span>
            ) : (
              <span className="text-blue-600">&gt;</span>
            )}
          </div>
        </div>

        {hasChildren && !node.isCollapsed && (
          <div>
            {node.children?.map((child, index) => (
              <XMLNodeComponent
                key={index}
                node={child}
                level={level + 1}
                onToggleCollapse={onToggleCollapse}
                path={`${path}.${index}`}
              />
            ))}
            <div style={{ marginLeft: indent }} className="xml-element">
              <span className="xml-tag-bracket">&lt;/</span>
              <span className="xml-tag-name">{node.name}</span>
              <span className="xml-tag-bracket">&gt;</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

/**
 * XMLFormatter Component
 * 
 * A React component that parses and displays XML content in a structured, formatted view.
 * Features include syntax highlighting, collapsible nodes, and error handling for malformed XML.
 */

export const XMLFormatter: React.FC<XMLFormatterProps> = ({ xmlString, className = "" }) => {
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());

  // Parse XML content once when xmlString changes
  const parsedXML = useMemo(() => {
    return parseXML(xmlString);
  }, [xmlString]);

  /**
   * Toggles the collapsed state of a node at the given path
   * @param {string} path - The unique path identifier for the node
   */
  const toggleCollapse = (path: string) => {
    setCollapsedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const updateNodeCollapse = (node: XMLNode, path: string): XMLNode => {
    if (node.type === 'element') {
      const isCollapsed = collapsedNodes.has(path);
      return {
        ...node,
        isCollapsed,
        children: node.children?.map((child, index) =>
          updateNodeCollapse(child, `${path}.${index}`)
        )
      };
    }
    return node;
  };

  // Handle case where XML parsing completely failed
  if (!parsedXML) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-md ${className}`}>
        <div className="text-red-800 font-semibold">XML Parsing Failed</div>
        <div className="text-red-600 text-sm mt-1">
          The provided content could not be parsed as valid XML.
        </div>
      </div>
    );
  }

  const nodeWithCollapseState = updateNodeCollapse(parsedXML, '0');

  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      <XMLNodeComponent
        node={nodeWithCollapseState}
        level={0}
        onToggleCollapse={toggleCollapse}
        path="0"
      />
    </div>
  );
};